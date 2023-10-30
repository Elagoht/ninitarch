import Image from 'next/image'
import React, { FC } from 'react'

const HeroImage: FC = () => {
  return <div
    className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col gap-4 items-center justify-center text-center px-8 py-16"
  >
    <Image src="/android-chrome-192x192.png" width={128} height={128} alt="NinitArch Logo" />
    <h1 className="text-4xl font-medium">NinitArch: <a
    href="https://ninite.com/">Ninite</a> for Arch Linux</h1>
    <span>Select the apps you want,<br/> NinitArch will create a script to install them all for you.</span>
    <p>
      We assume that you have already installed an AUR helper, such as <a href="https://aur.archlinux.org/packages/yay-bin/" target="_blank" rel="noreferrer">yay</a>, <a href="https://aur.archlinux.org/packages/paru-bin/" target="_blank" rel="noreferrer">paru</a> or <a href="https://aur.archlinux.org/packages/pamac-aur/" target="_blank" rel="noreferrer">pamac</a>.
    </p>
    <small>
      Created with ❤️ by <a href="https://github.com/Elagoht">Furkan Baytekin</a>.
    </small>
  </div>
}

export default HeroImage