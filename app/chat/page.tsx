import ChatBox from "../components/ChatBox";
import Instructions from "../components/Instructions";


export default function Home() {
  return (
    <main>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Welcome to Jarred's Portfolio
      </h1>
      <br></br>
      <Instructions />


      <ChatBox />
    </main>
  );
}
