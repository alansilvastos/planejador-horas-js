"use client";
import { useState, useEffect } from "react";
import Planner from "../components/Planner";
import Header from "../components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Planner />
    </main>
  );
}