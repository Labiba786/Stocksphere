"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

const data = [
  { month: "Jan", value: 87000 },
  { month: "Feb", value: 89500 },
  { month: "Mar", value: 93000 },
  { month: "Apr", value: 98500 },
  { month: "May", value: 110000 },
]

export function AnimatedPortfolioChart() {
  const [animatedData, setAnimatedData] = useState([data[0]])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length
        if (nextIndex === 0) {
          // Reset animation
          setAnimatedData([data[0]])
          return 0
        } else {
          // Add next data point
          setAnimatedData(data.slice(0, nextIndex + 1))
          return nextIndex
        }
      })
    }, 1000) // Change every 1 second

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="w-full bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 hover:scale-105 transition-all duration-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-white">Portfolio Performance 2024</CardTitle>
        <div className="text-3xl font-bold text-green-400">+35.3% Annual Growth</div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 10, right: 15, left: 15, bottom: 10 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: "#E5E7EB" }} />
              <YAxis
                domain={["dataMin - 2000", "dataMax + 2000"]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: "#E5E7EB" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={4}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#10B981", strokeWidth: 3, fill: "#ffffff" }}
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
