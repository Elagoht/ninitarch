"use client"

import { useAppListContext } from '@/context/apps'
import { Application } from '@/types'
import Image from 'next/image'
import React, { FC } from 'react'

const App: FC<Application> = (app) => {

  const { appList, setAppList } = useAppListContext()

  return <label key={app.package} className="flex gap-2 items-center cursor-pointer" title={app.package}>
    <input
      type="checkbox"
      value={app.package}
      name="apps"
      onChange={(event) => setAppList(event.target.checked
        ? [...appList, event.target.value]
        : appList.filter((app) => app !== event.target.value)
      )}
    />

    <Image src={`/Assets/Apps/${app.image}`} alt={app.name} width={32} height={32} className="aspect-square w-8 h-8" />

    <div className="flex flex-col w-full">
      <h4 className="leading-tight line-clamp-1 text-sm" translate="no">
        {app.name}
      </h4>
      <small className="line-clamp-1 text-gray-500" translate="no">
        {app.package}
      </small>
    </div>
  </label>
}

export default App