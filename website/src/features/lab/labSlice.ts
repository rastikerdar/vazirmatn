import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Font, fonts } from "./fonts";

export type LabState = {
  size: number;
  weight: number;
  alpha: number;
  font: Font;
  isVariable: boolean;
  justify: boolean;
  calt: boolean;
  tnum: boolean;
  text: string;
  contentEditable: boolean;
  selectedCollection: string;
};

export const initialState: LabState = {
  size: 16,
  weight: 400,
  alpha: 100,
  font: fonts[0],
  isVariable: false,
  justify: false,
  calt: true,
  tnum: false,
  text: "",
  contentEditable: true,
  selectedCollection: "persian",
};

const labSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {
    setFont(state, action: PayloadAction<Font>) {
      state.font = action.payload;
    },

    setIsVariable(state, action: PayloadAction<boolean>) {
      state.isVariable = action.payload;
    },

    setSize(state, action: PayloadAction<number>) {
      state.size = action.payload;
    },
    
    setWeight(state, action: PayloadAction<number>) {
      state.weight = action.payload;
    },
    
    setAlpha(state, action: PayloadAction<number>) {
      state.alpha = action.payload;
    },

    setJustify(state, action: PayloadAction<boolean>) {
      state.justify = action.payload;
    },

    setCalt(state, action: PayloadAction<boolean>) {
      state.calt = action.payload;
    },

    setTnum(state, action: PayloadAction<boolean>) {
      state.tnum = action.payload;
    },

    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },

    setContentEditable(state, action: PayloadAction<boolean>) {
      state.contentEditable = action.payload;
    },

    setSelectedCollection(state, action: PayloadAction<string>) {
      state.selectedCollection = action.payload;
    },

    setData(state, action: PayloadAction<LabState>) {
      return action.payload;
    },
  },
});

export const {
  setFont,
  setIsVariable,
  setSize,
  setWeight,
  setAlpha,
  setJustify,
  setCalt,
  setTnum,
  setText,
  setContentEditable,
  setSelectedCollection,
  setData,
} = labSlice.actions;

export const labReducer = labSlice.reducer;
