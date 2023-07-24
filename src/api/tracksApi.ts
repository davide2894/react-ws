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
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  mode: "no-cors",
  cache: "no-cache",
} as RequestInit;
const numberOfQuestionsInQuiz = 7;
const genericServerErrorMessage = "Bad response from server";
let artistsIdsArray: Array<number> = [];
let trackIdsArray: Array<number> = [];

export async function prepareQuizQuestions() {
  log("starting to prepare questions");

  // trackIdsArray = [];
  // artistsIdsArray = [];
  const trackList = await getTopTracksInCountry();
  const artistList = await getTopArtistInCountry();

  let questions: Array<any> = [];

  if (!trackList || !artistList) {
    return null;
  }

  for (let i = 0; i < numberOfQuestionsInQuiz; i++) {
    log(`preparing question number ${i + 1}`);

    const question = await prepareQuestion(trackList, artistList);
    if (question) {
      shuffleArray(question.choices);
      questions.push(question);
    }
  }

  log("finished to prepare questions");

  return questions ?? null;
}

export async function prepareQuestion(trackList: any, artistList: any) {
  const track = await recursiveGetRandomTrack(trackList);
  const snippet = await getTrackSnippet(track.track_id);
  const artistFirstAlternativeChoice = await getRandomTrack(artistList);
  const artistSecondAlternativeChoice = await getRandomArtist(artistList);

  // const artistFirstAlternativeChoice = await recursiveGetRandomArtist(
  //   artistList,
  //   1
  // );
  // const artistSecondAlternativeChoice = await recursiveGetRandomArtist(
  //   artistList,
  //   2
  // );

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

export function prepareMockQuestions(country: string = "wx") {
  return [
    {
      trackId: 1,
      trackName: "Azzurro",
      trackSnippet: {
        id: 1,
        body: "Nel blu dipinto di blu",
      },
      choices: [
        {
          id: 11,
          name: "Mario M",
          isCorrectChoice: true,
        },
        {
          id: 123,
          name: "Gigi D",
          isCorrectChoice: false,
        },
        {
          id: 1234,
          name: "Anna Tatangelo",
          isCorrectChoice: false,
        },
      ],
      isAnswered: false,
      isAnsweredCorrectly: false,
    },
    {
      trackId: 2,
      trackName: "Azzurro",
      trackSnippet: {
        id: 1,
        body: "Nel blu dipinto di blu",
      },
      choices: [
        {
          id: 11,
          name: "Mario M",
          isCorrectChoice: true,
        },
        {
          id: 123,
          name: "Gigi D",
          isCorrectChoice: false,
        },
        {
          id: 1234,
          name: "Anna Tatangelo",
          isCorrectChoice: false,
        },
      ],
      isAnswered: false,
      isAnsweredCorrectly: false,
    },
    {
      trackId: 3,
      trackName: "Azzurro",
      trackSnippet: {
        id: 1,
        body: "Nel blu dipinto di blu",
      },
      choices: [
        {
          id: 11,
          name: "Mario M",
          isCorrectChoice: true,
        },
        {
          id: 123,
          name: "Gigi D",
          isCorrectChoice: false,
        },
        {
          id: 1234,
          name: "Anna Tatangelo",
          isCorrectChoice: false,
        },
      ],
      isAnswered: false,
      isAnsweredCorrectly: false,
    },
    {
      trackId: 4,
      trackName: "Azzurro",
      trackSnippet: {
        id: 1,
        body: "Nel blu dipinto di blu",
      },
      choices: [
        {
          id: 11,
          name: "Mario M",
          isCorrectChoice: true,
        },
        {
          id: 123,
          name: "Gigi D",
          isCorrectChoice: false,
        },
        {
          id: 1234,
          name: "Anna Tatangelo",
          isCorrectChoice: false,
        },
      ],
      isAnswered: false,
      isAnsweredCorrectly: false,
    },
    {
      trackId: 5,
      trackName: "Azzurro",
      trackSnippet: {
        id: 1,
        body: "Nel blu dipinto di blu",
      },
      choices: [
        {
          id: 11,
          name: "Mario M",
          isCorrectChoice: true,
        },
        {
          id: 123,
          name: "Gigi D",
          isCorrectChoice: false,
        },
        {
          id: 1234,
          name: "Anna Tatangelo",
          isCorrectChoice: false,
        },
      ],
      isAnswered: false,
      isAnsweredCorrectly: false,
    },
    {
      trackId: 6,
      trackName: "Azzurro",
      trackSnippet: {
        id: 1,
        body: "Nel blu dipinto di blu",
      },
      choices: [
        {
          id: 11,
          name: "Mario M",
          isCorrectChoice: true,
        },
        {
          id: 123,
          name: "Gigi D",
          isCorrectChoice: false,
        },
        {
          id: 1234,
          name: "Anna Tatangelo",
          isCorrectChoice: false,
        },
      ],
      isAnswered: false,
      isAnsweredCorrectly: false,
    },
    {
      trackId: 7,
      trackName: "Azzurro",
      trackSnippet: {
        id: 1,
        body: "Nel blu dipinto di blu",
      },
      choices: [
        {
          id: 11,
          name: "Mario M",
          isCorrectChoice: true,
        },
        {
          id: 123,
          name: "Gigi D",
          isCorrectChoice: false,
        },
        {
          id: 1234,
          name: "Anna Tatangelo",
          isCorrectChoice: false,
        },
      ],
      isAnswered: false,
      isAnsweredCorrectly: false,
    },
  ];
}

async function getTopTracksInCountry(country: string = "wx") {
  const url = `${protocol}://${domain}/${path}/${version}/chart.tracks.get?chart_name=${queryParameters.chartName}&page=${queryParameters.page}&page_size=${queryParameters.pageSize}&country=${queryParameters.country}&f_has_lyrics=${queryParameters.filterHasLyrics}&apikey=${queryParameters.apiKey}`;
  const apiResponse = await fetch(url, options);
  if (!apiResponse.ok) {
    throw new Error(genericServerErrorMessage);
  }

  const parsedResponse = await apiResponse.json();
  // log({
  //   url,
  //   response: {
  //     rawResponse: apiResponse,
  //     headers: parsedResponse.message.header,
  //     body: parsedResponse.message.body,
  //   },
  // });

  return parsedResponse?.message?.body?.track_list ?? null;
}

async function getTrackSnippet(trackId: number) {
  const url = `${protocol}://${domain}/${path}/${version}/track.snippet.get?track_id=${trackId}&apikey=${queryParameters.apiKey}`;
  const apiResponse = await fetch(url, options);

  if (!apiResponse.ok) {
    throw new Error(genericServerErrorMessage);
  }

  const apiResponseJson = await apiResponse.json();
  return apiResponseJson?.message?.body?.snippet ?? null;
}

async function getTopArtistInCountry(country: string = "wx") {
  const url = `${protocol}://${domain}/${path}/${version}/chart.artists.get?page=${queryParameters.page}&page_size=${queryParameters.pageSize}&country=${queryParameters.country}&apikey=${queryParameters.apiKey}`;
  const apiResponse = await fetch(url, options);

  if (!apiResponse.ok) {
    throw new Error(genericServerErrorMessage);
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
function recursiveGetRandomTrack(trackList: any): Promise<any> {
  log("random track -- starting to get random track");
  return new Promise((resolve, reject) => {
    const randomTrack = trackList[getRandomNumber(trackList.length)].track;

    trackAttempt++;
    log({ trackAttemptNumber: trackAttempt });
    log({ trackIdsArray });

    if (trackIdsArray.includes(randomTrack.track_id)) {
      log(
        `random track -- duplicate found -- starting to call get random track function recursively`
      );
      recursiveGetRandomTrack(trackList);
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
