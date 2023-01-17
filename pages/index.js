import Head from "next/head";
import { Inter } from "@next/font/google";
import Script from "next/script";
import Moovie from "mooviejs";
import Hls from "hls.js";
// import sources from '../sources.json';

function initPlayer() {
  var demo = new Moovie({
    selector: "#example",
    dimensions: {
      width: "100%",
    },
    config: {
      storage: {
        captionOffset: false,
        playrateSpeed: false,
        captionSize: false,
      },
      controls: {
        playtime: false,
        volume: false,
        mute: false,
        subtitles: false,
        fullscreen: true,
        submenuCaptions: false,
        submenuOffset: false,
        allowLocalSubtitles: false,
      },
    },
    icons: {
      path: "https://raw.githubusercontent.com/BMSVieira/moovie.js/main/icons/",
    },
  });
  var video = demo.video;
  var currentSource = process.env.NEXT_PUBLIC_ENV_VARIABLE;
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(currentSource);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      console.log("Ready to play!");
    });
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initPlayer);
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>NowApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <Script src="../public/moovie.js" /> */}
        <link
          rel="shortcut icon"
          href="https://nextjs.org/static/favicon/apple-touch-icon.png"
          type="image/x-icon"
        />{" "}
      </Head>
      <video id="example" />
    </>
  );
}
