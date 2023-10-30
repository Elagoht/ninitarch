"use client"

import { FC, ReactNode } from "react"
import { AppListStore } from "./apps"

interface IProvidersProps {
  children: ReactNode
}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return <AppListStore>
    {children}
  </AppListStore>
}

export default Providers