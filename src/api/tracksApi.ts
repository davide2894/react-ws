import { Choice, QuestionType } from "@types";
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

  if (!trackList || !artistList) {
    return null;
  }

  let questions = [];

  while (true) {
    const question = await tryGetQuestion(trackList, artistList);
    if (isValidQuestion(question)) {
      shuffleArray(question.choices);
      questions.push(question);
      if (questions.length == numberOfQuestionsInQuiz) {
        break;
      } else {
        continue;
      }
    } else {
      continue;
    }
  }

  return questions;
}

async function tryGetQuestion(trackList: any, artistList: any) {
  const track = await getRandomTrackPromise(trackList);
  const snippet = await getTrackSnippet(track.track_id);
  const artistFirstAlternativeChoice = await getRandomArtistPromise(
    artistList,
    1
  );
  const artistSecondAlternativeChoice = await getRandomArtistPromise(
    artistList,
    2
  );
  if (
    isValidTrack(track) &&
    isValidSnippet(snippet) &&
    isValidArtistAlternativeChoice(artistFirstAlternativeChoice) &&
    isValidArtistAlternativeChoice(artistSecondAlternativeChoice)
  ) {
    return createQuestionObject(
      track,
      snippet,
      artistFirstAlternativeChoice,
      artistSecondAlternativeChoice
    );
  } else {
    return createEmpyQuestionObject();
  }
}

function isValidQuestion(question: {
  trackId?: QuestionType["trackId"];
  trackName?: QuestionType["trackName"];
  trackSnippet?: QuestionType["trackSnippet"];
  choices?: Choice[];
}) {
  return (
    question &&
    Object.keys(question).length &&
    question.trackId &&
    question.trackName &&
    question.trackSnippet &&
    question.trackSnippet.id &&
    question.trackSnippet.body &&
    question.choices &&
    question.choices.length == 3 &&
    question.choices[0].id &&
    question.choices[0].name &&
    question.choices[1].id &&
    question.choices[1].name &&
    question.choices[2].id &&
    question.choices[2].name
  );
}

async function getTopTracksInCountry() {
  const url = `${protocol}://${domain}/${path}/${version}/chart.tracks.get?chart_name=${queryParameters.chartName}&page=${queryParameters.page}&page_size=${queryParameters.pageSize}&country=${queryParameters.country}&f_has_lyrics=${queryParameters.filterHasLyrics}&apikey=${queryParameters.apiKey}`;
  const apiResponse = await fetch(url, options);
  if (!apiResponse.ok) {
    log({ apiResponse });
    throw new Error(genericServerErrorMessage).stack;
  }

  const parsedResponse = await apiResponse.json();
  return parsedResponse?.message?.body?.track_list ?? null;
}

async function getTopArtistInCountry() {
  const url = `${protocol}://${domain}/${path}/${version}/chart.artists.get?page=${queryParameters.page}&page_size=${queryParameters.pageSize}&country=${queryParameters.country}&apikey=${queryParameters.apiKey}`;
  const apiResponse = await fetch(url, options);
  if (!apiResponse.ok) {
    log({ apiResponse });
    throw new Error(genericServerErrorMessage).stack;
  }

  const parsedResponse = await apiResponse.json();
  return parsedResponse?.message?.body?.artist_list ?? null;
}

function isValidTrack(track: { track_id: number; track_name: string }) {
  return track && track.track_id && track.track_name;
}

function isValidSnippet(snippet: { snippet_id: number; snippet_body: string }) {
  return snippet && snippet.snippet_id && snippet.snippet_body;
}

function isValidArtistAlternativeChoice(artistAlternativeChoice: {
  artist_id: number;
  artist_name: string;
}) {
  return (
    artistAlternativeChoice &&
    artistAlternativeChoice.artist_id &&
    artistAlternativeChoice.artist_name
  );
}

function createQuestionObject(
  track: {
    track_id: number;
    track_name: string;
    artist_id: number;
    artist_name: string;
  },
  snippet: { snippet_id: number; snippet_body: string },
  artistFirstAlternativeChoice: { artist_id: number; artist_name: string },
  artistSecondAlternativeChoice: { artist_id: number; artist_name: string }
) {
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

function createEmpyQuestionObject() {
  return {
    trackId: 0,
    trackName: "",
    trackSnippet: {
      id: 0,
      body: "",
    },
    choices: [],
    isAnsweredCorrectly: false,
  };
}

async function getTrackSnippet(trackId: number) {
  const url = `${protocol}://${domain}/${path}/${version}/track.snippet.get?track_id=${trackId}&apikey=${queryParameters.apiKey}`;
  const apiResponse = await fetch(url, options);

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

function getRandomTrackPromise(trackList: any): Promise<any> {
  return new Promise((resolve) => {
    log("entering getRandomTrackPromise promise");
    function recursiveGetRandomTrack() {
      const randomTrack = trackList[getRandomNumber(trackList.length)].track;

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
  return new Promise((resolve) => {
    function recursiveGetRandomArtist() {
      const randomArtist =
        artistList[getRandomNumber(artistList.length)].artist;

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
