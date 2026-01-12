"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HotDeals() {
  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 1,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Load saved time from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("deal_time_left");
    if (saved) setTimeLeft(JSON.parse(saved));
  }, []);

  // Countdown + save to localStorage
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
              }
            }
          }
        }

        const updated = { days, hours, minutes, seconds };
        localStorage.setItem("deal_time_left", JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl overflow-hidden w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
            {/* IMAGE */}
            <div className="relative w-64 h-64 lg:w-100 lg:h-100">
              <Image
                src="/assets/img/floded/floded-01.png"
                alt="Pro2 Abstract Folded Pots"
                fill
                className="object-contain"
              />
            </div>

            {/* CONTENT */}
            <div className="text-center mx-auto max-w-xl">
              <div className="flex items-baseline mb-4 justify-center lg:justify-start">
                <span className="inline-block text-red-600 font-semibold mb-2 text-2xl">
                  $49.00
                </span>
                <span className="text-2xl text-gray-400 line-through">$59.00</span>
              </div>

              <Link href="/shop-details">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 hover:text-pink-600">
                  Pro2 Abstract Folded Pots
                </h2>
              </Link>

              <p className="text-gray-600 mb-6">
                Turning Passion into Career – VTC Academy
              </p>

              {/* COUNTDOWN */}
              <div className="flex gap-4 justify-center lg:justify-start mb-6">
                <StatBox label="Days" value={timeLeft.days} />
                <StatBox label="Hour" value={String(timeLeft.hours).padStart(2, "0")} />
                <StatBox label="Minute" value={String(timeLeft.minutes).padStart(2, "0")} />
                <StatBox label="Second" value={String(timeLeft.seconds).padStart(2, "0")} />
              </div>

              <p className="text-sm text-gray-500 italic">
                *Remains until the end of the offer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value }: { label: string; value: any }) {
  return (
    <div className="text-center">
      <div className="bg-white rounded-lg px-4 py-3 shadow-sm min-w-[80px]">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500 uppercase">{label}</div>
      </div>
    </div>
  );
}
