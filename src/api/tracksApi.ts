import getRandomNumber from "@utils/getRandomNumber";
import log from "@utils/log";
import { shuffleArray } from "@utils/shuffleArray";

const protocol = "https";
const domain = "api.musixmatch.com";
const path = "ws";
const version = "1.1";
const queryParameters = {
  chartName: "top",
  page: 1,
  pageSize: 100,
  country: "wx",
  filterHasLyrics: 1,
  apiKey: "7e959512aa03eb3015992c083ef812a8",
};
const options = {
  method: "GET",
  cache: "no-cache",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "https://api.musixmatch.com/",
  },
} as RequestInit;
const numberOfQuestionsInQuiz = 7;
const genericServerErrorMessage = "Bad response from server";
let artistsIdsArray: Array<number> = [];
let trackIdsArray: Array<number> = [];

export async function prepareQuizQuestions() {
  log("starting to prepare questions");

  trackIdsArray = [];
  artistsIdsArray = [];

  const trackList = await getTopTracksInCountry();
  const artistList = await getTopArtistInCountry();

  log({
    trackList,
    artistList,
  });

  let questions: Array<any> = [];

  if (!trackList || !artistList) {
    return null;
  }

  for (let i = 0; i < numberOfQuestionsInQuiz; i++) {
    log(`preparing question number ${i + 1}`);

    prepareQuestion(trackList, artistList)
      .then((question) => {
        log({ fetchedSingleQuestion: question });
        shuffleArray(question.choices);
        questions.push(question);
      })
      .catch((err) => {
        throw new Error(err).stack;
      });
  }

  log("finished to prepare questions");
  return questions ?? null;
}

async function getMockTopTracksInCountry() {
  const apiResponse = await fetch("/api/mockTopTracks.json");
  if (!apiResponse.ok) {
    log({ apiResponse });
    throw new Error(genericServerErrorMessage).stack;
  }

  const parsedResponse = await apiResponse.json();
  return parsedResponse?.message?.body?.track_list ?? null;
}

async function getMockTopArtistInCountry() {
  const apiResponse = await fetch("./api/mockTopArtists.json");
  if (!apiResponse.ok) {
    log({ apiResponse });
    throw new Error(genericServerErrorMessage).stack;
  }

  const parsedResponse = await apiResponse.json();
  return parsedResponse?.message?.body?.track_list ?? null;
}

export async function prepareQuestion(trackList: any, artistList: any) {
  // const track = await recursiveGetRandomTrack(trackList);
  const track = await getRandomTrackPromise(trackList);
  log({ promisedTrack: track });
  const snippet = await getTrackSnippet(track.track_id);
  // const artistFirstAlternativeChoice = await getRandomArtist(artistList);
  // const artistSecondAlternativeChoice = await getRandomArtist(artistList);

  const artistFirstAlternativeChoice = await getRandomArtistPromise(
    artistList,
    1
  );
  const artistSecondAlternativeChoice = await getRandomArtistPromise(
    artistList,
    2
  );

  return {
    trackId: track.track_id,
    trackName: track.track_name,
    trackSnippet: {
      id: snippet.snippet_id,
      body: snippet.snippet_body,
    },
    choices: [
      {
        id: track.artist_id,
        name: track.artist_name,
        isCorrectChoice: true,
      },
      {
        id: artistFirstAlternativeChoice.artist_id,
        name: artistFirstAlternativeChoice.artist_name,
        isCorrectChoice: false,
      },
      {
        id: artistSecondAlternativeChoice.artist_id,
        name: artistSecondAlternativeChoice.artist_name,
        isCorrectChoice: false,
      },
    ],
    isAnsweredCorrectly: false,
  };
}

async function getTopTracksInCountry(country: string = "wx") {
  const url = `${protocol}://${domain}/${path}/${version}/chart.tracks.get?chart_name=${queryParameters.chartName}&page=${queryParameters.page}&page_size=${queryParameters.pageSize}&country=${queryParameters.country}&f_has_lyrics=${queryParameters.filterHasLyrics}&apikey=${queryParameters.apiKey}`;
  const proxedUrl = "https://corsproxy.io/?" + url;
  log({ tracksUrl: url });
  log({ tracksOptions: options });

  const apiResponse = await fetch(proxedUrl, options);
  if (!apiResponse.ok) {
    log({ apiResponse });
    throw new Error(genericServerErrorMessage).stack;
  }

  const parsedResponse = await apiResponse.json();
  return parsedResponse?.message?.body?.track_list ?? null;
}

async function getTrackSnippet(trackId: number) {
  const url = `${protocol}://${domain}/${path}/${version}/track.snippet.get?track_id=${trackId}&apikey=${queryParameters.apiKey}`;
  const proxedUrl = "https://corsproxy.io/?" + url;

  const apiResponse = await fetch(proxedUrl, options);

  log(`getTrackSnippet -- trackID --> ${trackId}`);

  if (!apiResponse.ok) {
    log(`getTrackSnippet -- snippet api response --> ${apiResponse}`);
    throw new Error(genericServerErrorMessage);
  }

  log(`getTrackSnippet -- snippet api response --> ${apiResponse}`);

  const apiResponseJson = await apiResponse.json();
  log(`getTrackSnippet -- snippet api response json --> ${apiResponseJson}`);

  return apiResponseJson?.message?.body?.snippet ?? null;
}

async function getTopArtistInCountry(country: string = "wx") {
  const url = `${protocol}://${domain}/${path}/${version}/chart.artists.get?page=${queryParameters.page}&page_size=${queryParameters.pageSize}&country=${queryParameters.country}&apikey=${queryParameters.apiKey}`;
  const proxedUrl = "https://corsproxy.io/?" + url;
  log({ proxedUrl });
  const apiResponse = await fetch(proxedUrl, options);

  if (!apiResponse.ok) {
    throw new Error(genericServerErrorMessage).stack;
  }

  const apiResponseJson = await apiResponse.json();
  return apiResponseJson?.message?.body?.artist_list ?? null;
}

function getRandomTrack(trackList: any) {
  const randomTrack = trackList[getRandomNumber(trackList.length)].track;
  if (trackIdsArray.includes(randomTrack.track_id)) {
    getRandomTrack(trackList);
  } else {
    trackIdsArray.push(randomTrack.track_id);
    return randomTrack;
  }
}

function getRandomArtist(artistList: any) {
  const randomArtist = artistList[getRandomNumber(artistList.length)].artist;
  return randomArtist;
}

let trackAttempt = 0;
function getRandomTrackPromise(trackList: any): Promise<any> {
  return new Promise((resolve, reject) => {
    log("entering getRandomTrackPromise promise");
    function recursiveGetRandomTrack() {
      const randomTrack = trackList[getRandomNumber(trackList.length)].track;

      trackAttempt++;
      log({ trackAttemptNumber: trackAttempt });
      log({ trackIdsArray });

      if (trackIdsArray.includes(randomTrack.track_id)) {
        log(
          `random track -- duplicate found -- starting to call get random track function recursively`
        );
        recursiveGetRandomTrack();
      } else {
        log(
          `random track -- recursion breaking condition happening. Pushing found track with id ${randomTrack.track_id}`
        );
        trackIdsArray.push(randomTrack.track_id);
        log({ trackIdsArray });
        resolve(randomTrack);
      }
    }

    recursiveGetRandomTrack();
  });
}

function getRandomArtistPromise(
  artistList: any,
  otherArtistNumber: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    function recursiveGetRandomArtist() {
      const randomArtist =
        artistList[getRandomNumber(artistList.length)].artist;

      artistAttempt++;
      log({ artistsIdsArray });

      if (artistsIdsArray.includes(randomArtist.artist_id)) {
        log(
          `random artist ${otherArtistNumber} -- duplicate found -- starting to call get random artist function recursively`
        );
        recursiveGetRandomArtist();
      } else {
        log(
          `random artist ${otherArtistNumber} -- recursion breaking condition happening. Pushing found artist with id ${randomArtist.artist_id}`
        );
        log({ artistsIdsArray });
        artistsIdsArray.push(randomArtist.artist_id);
        resolve(randomArtist);
      }
    }
    recursiveGetRandomArtist();
  });
}

let trackAttemptt = 0;
function RrecursiveGetRandomTrack(trackList: any): Promise<any> {
  log("random track -- starting to get random track");
  return new Promise((resolve, reject) => {
    const randomTrack = trackList[getRandomNumber(trackList.length)].track;

    trackAttemptt++;
    log({ trackAttemptNumber: trackAttemptt });
    log({ trackIdsArray });

    if (trackIdsArray.includes(randomTrack.track_id)) {
      log(
        `random track -- duplicate found -- starting to call get random track function recursively`
      );
      RrecursiveGetRandomTrack(trackList);
    } else {
      log(
        `random track -- recursion breaking condition happening. Pushing found track with id ${randomTrack.track_id}`
      );
      trackIdsArray.push(randomTrack.track_id);
      log({ trackIdsArray });
      resolve(randomTrack);
    }
  });
}

let artistAttempt = 0;
function recursiveGetRandomArtist(
  artistList: any,
  otherArtistNumber: number
): Promise<any> {
  log(
    `random artist ${otherArtistNumber} -- starting to get random artist number ${otherArtistNumber}`
  );
  return new Promise((resolve, reject) => {
    const randomArtist = artistList[getRandomNumber(artistList.length)].artist;

    artistAttempt++;
    log({ artistsIdsArray });

    if (artistsIdsArray.includes(randomArtist.artist_id)) {
      log(
        `random artist ${otherArtistNumber} -- duplicate found -- starting to call get random artist function recursively`
      );
      recursiveGetRandomArtist(artistList, otherArtistNumber);
    } else {
      log(
        `random artist ${otherArtistNumber} -- recursion breaking condition happening. Pushing found artist with id ${randomArtist.artist_id}`
      );
      log({ artistsIdsArray });
      artistsIdsArray.push(randomArtist.artist_id);
      resolve(randomArtist);
    }
  });
}
