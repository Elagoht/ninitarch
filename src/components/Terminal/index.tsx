"use client"

import { useAppListContext } from '@/context/apps'
import React, { FC, useState } from 'react'

const Terminal: FC = () => {

  const { appList } = useAppListContext()

  const [aurHelper, setAurHelper] = useState<string>("paru")

  return <div
    className="bg-black text-white p-8" translate="no"
  >
    <code>
      <span style={{ color: "#00ff00" }}>{aurHelper}</span>
      <span style={{ color: "#ffffff" }}>{
        aurHelper !== "pamac"
          ? " -S"
          : " install"
      } </span>
      <span style={{ color: "#ff00ff" }}>{
        aurHelper === "pamac"
          ? "--no-confirm"
          : "--noconfirm"
      } </span>
      <span style={{ color: "#ffff00" }}>
        {appList.join(" ")}
      </span>
    </code>
    <div className="-m-8 mt-8 pl-8 bg-stone-900">
      {["paru", "yay", "pamac"].map((helper) =>
        <button
          key={helper}
          className={`mr-2 px-4 py-2 text-white bg-yellow-500 ${aurHelper === helper
            ? "text-black"
            : "bg-opacity-10"}`
          }
          onClick={() => setAurHelper(helper)}
        >
          {helper}
        </button>
      )}
    </div>
  </div>
}

export default Terminal