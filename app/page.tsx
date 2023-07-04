import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
   return (
      <main className={styles.wrapper}>
         <div>
            <Link href={"/register"}>Register for events</Link>
         </div>
         <div>
            <Link href={"/creators"}>Create events</Link>
         </div>
      </main>
   );
}
