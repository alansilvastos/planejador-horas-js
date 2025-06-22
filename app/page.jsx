'use client';
import { useState } from 'react';
import Planner from '../components/Planner';
import Header from '../components/Header';

export default function Home() {
  const [goal, setGoal] = useState('regular');

  return (
    <main className="container">
      <Header selected={goal} setSelected={setGoal} />
      <Planner goal={goal} />
    </main>
  );
}