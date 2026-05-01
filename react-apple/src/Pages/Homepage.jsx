import React from "react";
import "../assets/css/bootstrap.css";
import "../assets/css/styles.css";
import Alert from "../components/Alert";
import IpadPro from "../components/IpadPro";
import MackbookAir from "../components/MackbookAir";
import Iphone11Pro from "../components/Iphone11Pro";
import Iphone11 from "../components/Iphone11";
import TvWatchRow from "../components/TvWatchRow";
import ArcadCardRow from "../components/ArcadCardRow";
import YoutubeVideos from "../Services/YouTubeVideos"; 

function HomePage() {
  return (
    <>
      <Alert />
      <IpadPro />
      <MackbookAir />
      <Iphone11Pro />
      <Iphone11 />
      <TvWatchRow />
      <ArcadCardRow />
      <YoutubeVideos /> 
    </>
  );
}

export default HomePage;
