"use client"

import { FC, ReactNode, createContext, useContext, useState } from "react";

const AppListContext = createContext<{
  appList: string[]
  setAppList: (appList: string[]) => void
}>({ appList: [], setAppList: () => { } })

interface IAppListContext {
  children: ReactNode
}

export const AppListStore: FC<IAppListContext> = ({ children }) => {
  const [appList, setAppList] = useState<string[]>([])

  return <AppListContext.Provider value={{
    appList,
    setAppList
  }}>
    {children}
  </AppListContext.Provider>
}

export default AppListContext

export const useAppListContext = () => useContext(AppListContext)