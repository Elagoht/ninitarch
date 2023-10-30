import AppList from "@/components/AppList"
import AppsContainer from "@/components/AppsContainer"
import HeroImage from "@/components/HeroImage"
import { Application } from "@/types"

import essentials from "@/data/Essentials.json"
import development from "@/data/Development.json"
import games from "@/data/Games.json"
import gaming from "@/data/Gaming.json"
import terminal from "@/data/Terminal.json"
import Terminal from "@/components/Terminal"

const AppPage = () => {

  const categories = [
    { category: "Essentials", apps: essentials },
    { category: "Development", apps: development },
    { category: "Terminal", apps: terminal },
    { category: "Gaming", apps: gaming },
    { category: "Games", apps: games },
  ]

  return <div>
    <HeroImage />
    <Terminal />
    <form id="app-list">
      {categories.map(({ category, apps }, index) =>
        <AppsContainer
          key={index}
          odd={index % 2 === 1}
          category={category}
        >
          {Object.entries(apps).map(([category, apps]) =>
            <AppList
              key={category}
              title={category}
              apps={apps as Application[]}
            />
          )}
        </AppsContainer>
      )}
    </form>
  </div>
}

export default AppPage