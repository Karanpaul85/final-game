import styles from "./page.module.css";
import Search from "./components/search";

export default function Home() {
  return (
    <div className="wrapper">
      <main>
        <div className={styles.topContent}>
          <p>
            Welcome to the ultimate destination for lottery enthusiasts! Whether
            you're aiming for massive jackpots or thrilling instant wins, our
            platform offers a secure and exciting way to test your luck. With
            easy ticket purchases, fair draws, and guaranteed payouts, every
            ticket brings you closer to life-changing rewards. Join millions of
            players, choose your lucky numbers, and experience the thrill of
            winning big. The next jackpot winner could be you—don't miss your
            chance to make your dreams a reality. Play today and let fortune
            smile upon you!
          </p>
        </div>
        <Search />
      </main>
    </div>
  );
}
