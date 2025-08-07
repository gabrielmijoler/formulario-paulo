import Image from "next/image";

import WaveBottonLeft from "@images/bottom-left-wave.svg";
import WaveTopRight from "@images/top-right-wave.svg";
import Loader from "../loader";

export default function LoadingPage() {
  return (
    <>
      <div
        className="absolute top-0 right-0"
        data-testid="top-right-wave-wrapper"
      >
        <Image
          alt="Wave superior Express"
          className="block max-w-[90px] sm:max-w-[150px] xl:max-w-fit"
          height={496}
          priority
          src={WaveTopRight as string}
          width={446}
        />
      </div>
      <div className="bg-white h-dvh flex flex-col items-center justify-center">
        <main className="h-full flex flex-col items-center justify-center z-[1]">
          <Loader />
        </main>
        <footer
          className="pb-4 text-sm text-center text-multi-neutral-600 font-medium z-[1]"
          role="footer"
        >
          ® 1987-{new Date().getFullYear()} GRUPO MULTI - Todos os direitos
          reservados.
        </footer>
      </div>
      <div className="absolute bottom-0 left-0">
        <Image
          alt="Wave superior Express"
          className="block max-w-[90px] sm:max-w-[150px] xl:max-w-fit"
          height={496}
          src={WaveBottonLeft as string}
          width={446}
        />
      </div>
    </>
  );
}
