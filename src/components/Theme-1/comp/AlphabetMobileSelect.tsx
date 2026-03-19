"use client";

import React from "react";

interface Props {
  slug: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetMobileSelect({ slug }: Props) {
  return (
    <select
      className="form-select alpha-mobile-select "
      style={{ maxWidth: "260px", fontWeight: 600, margin: "0 0 0 auto" }}
      value={slug}
      onChange={(e) => {
        window.location.href = `/all-stores/${e.target.value}`;
      }}
    >
      {ALPHABETS.map((alpha) => (
        <option key={alpha} value={alpha}>
          {alpha}
        </option>
      ))}
      <option value="other">#</option>
    </select>
  );
}
