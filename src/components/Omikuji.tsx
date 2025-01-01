'use client';

import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ShareButtons from "./ShareButtons";
import LoadingAnimation from "./LoadingAnimation";

interface OmikujiResult {
  fortune: string;
  details: {
    avatar: string;
    modification: string;
    sugar: string;
  };
}

export default function Omikuji() {
  const [loading, setLoading] = useState<boolean>(false);
  const [omikuji, setOmikuji] = useState<OmikujiResult | null>(null);

  const fortunes = ["大吉", "中吉", "小吉", "凶"];

  const getRandomFortune = (): string => {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  };

  const parseOmikujiResult = (text: string): OmikujiResult => {
    const lines = text.split("\n").filter((line) => line.includes(":"));
  
    const trimText = (text: string, maxLength: number = 20) => {
      return (text || "").trim().slice(0, maxLength);
    };
  
    return {
      fortune: lines.find((line) => line.startsWith("運勢:"))?.split(":")[1]?.trim() || "不明",
      details: {
        avatar: trimText(lines.find((line) => line.startsWith("アバター:"))?.split(":")[1] || "情報なし"),
        modification: trimText(lines.find((line) => line.startsWith("改変:"))?.split(":")[1] || "情報なし"),
        sugar: trimText(lines.find((line) => line.startsWith("Sugar:"))?.split(":")[1] || "情報なし"),
      },
    };
  };

  const drawOmikuji = async () => {
    setLoading(true);
    setOmikuji(null);

    const fortune = getRandomFortune();
    const prompt = process.env.NEXT_PUBLIC_OMIKUJI_PROMPT?.replace('${fortune}', fortune) || '';

    try {
      const response = await axios.post("/api/omikujiAPI", { prompt });
      const result = parseOmikujiResult(response.data.message);
      setOmikuji(result);
    } catch (error) {
      console.error("APIエラー:", error);
      alert("おみくじの生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-red-600">
              VRCおみくじ
            </h1>
            <p className="text-gray-500">
              新年のVRC運勢を占ってみましょう
            </p>
          </div>

          {!omikuji && !loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <svg
                viewBox="0 0 100 100"
                className="w-24 h-24 mb-8 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeLinejoin="round">
                  <path d="M30 25 L70 25 L70 75 L50 60 L30 75 Z" />
                  <path d="M50 60 L50 25" />
                </g>
              </svg>
              <motion.button
                onClick={drawOmikuji}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white py-3 rounded-xl font-bold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:from-red-600 hover:via-red-700 hover:to-red-600 transition-all"
              >
                おみくじを引く
              </motion.button>
            </div>
          )}

          <AnimatePresence>
            {loading && <LoadingAnimation />}
          </AnimatePresence>

          {omikuji && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                  {omikuji.fortune}
                </h2>
              </div>

              <div className="bg-white rounded-xl p-6">
                {Object.entries(omikuji.details).map(([key, value]) => (
                  <div key={key} className="mb-4 last:mb-0">
                    <div className="flex items-start">
                      <span className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        {key === "avatar"
                          ? "アバター"
                          : key === "modification"
                            ? "改変"
                            : "砂糖"}
                      </span>
                      <p className="ml-4 text-gray-700 flex-1">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <motion.button
                  onClick={() => setOmikuji(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-500 text-white py-3 rounded-xl font-bold shadow-md"
                >
                  もう一度引く
                </motion.button>
                <ShareButtons
                  result={omikuji.fortune}
                  message={`アバター: ${omikuji.details.avatar}\n改変: ${omikuji.details.modification}\n砂糖: ${omikuji.details.sugar}`}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 text-center border-t border-gray-100">
        </div>
      </motion.div>
    </div>
  );
}