"use client";

import { createContext, useContext, useState } from "react";

export interface ScrapedArticle {
  title: string;
  publication: string;
  excerpt: string;
  textContent: string;
}

export interface PronunciationEntry {
  word: string;
  pronunciation: string;
}

export interface VoiceChoice {
  voiceId: string;
  voiceName: string;
}

interface CreateBriefState {
  url: string;
  setUrl: (v: string) => void;
  article: ScrapedArticle | null;
  setArticle: (v: ScrapedArticle | null) => void;
  style: string;
  setStyle: (v: string) => void;
  wantsReview: boolean;
  setWantsReview: (v: boolean) => void;
  specialInstructions: string;
  setSpecialInstructions: (v: string) => void;
  reviewedScript: string | null;
  setReviewedScript: (v: string | null) => void;
  voice: VoiceChoice | null;
  setVoice: (v: VoiceChoice | null) => void;
  pronunciations: PronunciationEntry[];
  setPronunciations: (v: PronunciationEntry[]) => void;
  reset: () => void;
}

const CreateBriefCtx = createContext<CreateBriefState | null>(null);

export function CreateBriefProvider({ children }: { children: React.ReactNode }) {
  const [url, setUrl] = useState("");
  const [article, setArticle] = useState<ScrapedArticle | null>(null);
  const [style, setStyle] = useState("Conversational");
  const [wantsReview, setWantsReview] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [reviewedScript, setReviewedScript] = useState<string | null>(null);
  const [voice, setVoice] = useState<VoiceChoice | null>(null);
  const [pronunciations, setPronunciations] = useState<PronunciationEntry[]>([]);

  function reset() {
    setUrl("");
    setArticle(null);
    setStyle("Conversational");
    setWantsReview(false);
    setSpecialInstructions("");
    setReviewedScript(null);
    setVoice(null);
    setPronunciations([]);
  }

  return (
    <CreateBriefCtx.Provider
      value={{
        url, setUrl,
        article, setArticle,
        style, setStyle,
        wantsReview, setWantsReview,
        specialInstructions, setSpecialInstructions,
        reviewedScript, setReviewedScript,
        voice, setVoice,
        pronunciations, setPronunciations,
        reset,
      }}
    >
      {children}
    </CreateBriefCtx.Provider>
  );
}

export function useCreateBrief() {
  const ctx = useContext(CreateBriefCtx);
  if (!ctx) throw new Error("useCreateBrief must be used within CreateBriefProvider");
  return ctx;
}
