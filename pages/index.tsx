import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";
import {
  FaCircleNotch,
  FaGitAlt,
  FaGithub,
  FaGithubAlt,
  FaSearch,
} from "react-icons/fa";
import Error from "../components/Error";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import { User } from "../types";

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const fetchGithubUser = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setUser(null);
      const username = userNameRef.current?.value.trim();
      if (!username) return;
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(data);
      userNameRef.current && (userNameRef.current.value = "");
    } catch (error: any) {
      setError(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Github Profiles</title>
      </Head>
      <section className="min-h-[100vh] bg-gray-900  text-gray-200">
        <div className="container">
          <main className="flex flex-col items-center">
            <h1 className="home-heading">
              Enter Github Username to see their Profile
            </h1>
            <form
              onSubmit={fetchGithubUser}
              className="flex items-center gap-4"
            >
              <input
                type="text"
                required
                ref={userNameRef}
                placeholder="Username"
                className="input"
              />
              <button disabled={loading} type="submit" className="btn-brand">
                Search {loading ? <FaCircleNotch /> : <FaSearch />}
              </button>
            </form>
            {error ? (
              <Error message={error} />
            ) : user ? (
              <UserCard user={user} />
            ) : (
              <div className="pt-24 pb-10">
                <FaGithub className="text-[200px] text-gray-800" />
              </div>
            )}
          </main>
          <Footer />
        </div>
      </section>
    </>
  );
};

export default Home;
