import { FC, ReactNode } from "react"

interface IAppsContainer {
  category: string
  odd?: boolean
  children: ReactNode
}

const AppsContainer: FC<IAppsContainer> = ({ category, odd, children }) => {
  return <section className={`p-8 mx-auto mb-8 ${odd ? "bg-gray-200 dark:bg-gray-800" : ""}`}>
    <h2 className="text-2xl font-bold mb-4">{category}</h2>
    <div className="
      gap-8 columns-6
      max-2xl:columns-5
      max-xl:columns-4
      max-lg:columns-3
      max-md:columns-2
      max-sm:columns-1"
    >
      {children}
    </div>
  </section>
}

export default AppsContainer