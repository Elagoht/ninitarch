import { Application } from "@/types"
import { FC } from "react"
import App from "../App"


interface IAppListProps {
  title: string
  apps: Application[]
}

const AppList: FC<IAppListProps> = ({ title, apps }) => {
  return <div className="max-w-xs break-inside-avoid mb-8">
    <h3 className="font-bold text-lg">{title}</h3>
    <div className="flex gap-2 flex-col">
      {apps.map((app) =>
        <App
          key={app.package}
          {...app}
        />
      )}
    </div>
  </div>

}

export default AppList