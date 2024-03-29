import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IVideo2151,
  IVideo2150,
  IVideoSourceParams,
  IVideoInitParams,
  IChapterInfo,
} from "../../interfaces/player.interface";
import { netVideoInit, netVideoSource } from "../../apis/Player";

export interface IPlayer {
  videoSource: IVideo2151;
  videoInit: IVideo2150;
  bookId: string;
  chapterId: string;
  swiperIndex: number;
  videoList: IChapterInfo[];
  isLeave: boolean;
}

export const videoInitAsync = createAsyncThunk(
  'player/getVideoInit',
  (params: IVideoInitParams) => {
    return netVideoInit(params);
  }
);

export const videoSourceAsync = createAsyncThunk(
  'player/getVideoSource',
  (params: IVideoSourceParams) => {
    return netVideoSource(params);
  }
);

export const playerSlice = createSlice({
  name: 'player',
  initialState: (): IPlayer => ({
    videoInit: {} as IVideo2150,
    videoSource: {
      isInBookShelf: false,
      chapterInfo: [] as IChapterInfo[]
    } as IVideo2151,
    bookId: '',
    chapterId: '',
    swiperIndex: 0,
    videoList: [],
    isLeave: false,
  }),
  reducers: {
    setBookId: (state: IPlayer, action: PayloadAction<string>) => {
      state.bookId = action.payload;
    },
    setChapterId: (state: IPlayer, action: PayloadAction<string>) => {
      state.chapterId = action.payload;
    },
    setIsInBookShelf: (state: IPlayer, action: PayloadAction<boolean>) => {
      state.videoSource = { ...state.videoSource, isInBookShelf: action.payload }
    },
    setVideoSource: (state: IPlayer, action: PayloadAction<IVideo2151>) => {
      state.videoSource = { ...state.videoSource, ...action.payload }
      state.bookId = action.payload.bookId;
      state.chapterId = action.payload?.chapterInfo?.[0]?.chapterId || '';
    },
    setSwiperIndex: (state: IPlayer, action: PayloadAction<number>) => {
      state.swiperIndex = action.payload;
      state.chapterId = state.videoList?.[action.payload]?.chapterId;
    },
    setVideoList: (state: IPlayer, action: PayloadAction<IChapterInfo[]>) => {
      state.videoList = [...action.payload];
    },
    // 离开播放器 释放资源
    doLeavePlayer: (state: IPlayer, action) => {
      const { swiperIndex, videoList } = state
      state.videoList = videoList[swiperIndex] ? JSON.parse(JSON.stringify([videoList[swiperIndex]])) : [];
      state.swiperIndex = 0;
      state.isLeave = true;
    },
    setIsLeave:(state: IPlayer, action) => {
      state.isLeave = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(videoInitAsync.fulfilled, (state, action) => {
        state.videoInit = action.payload;
      })
      .addCase(videoSourceAsync.fulfilled, (state, action) => {
        state.videoSource = action.payload;
        state.bookId = action.payload.bookId;
      })
  }
});


export const { setBookId, setChapterId, setIsInBookShelf, setVideoSource, setSwiperIndex, setVideoList, doLeavePlayer, setIsLeave } = playerSlice.actions;
