import Image from "next/image";
import React from "react";
import { User } from "../types";
import moment from "moment";

interface UserCardProps {
  user: User;
}

const UserCard = ({
  user: { avatar_url, created_at, login, name, public_gists, public_repos },
}: UserCardProps) => {
  return (
    <div className="user-card">
      <Image
        src={avatar_url}
        height={110}
        width={110}
        objectFit="cover"
        className="rounded-[50%]"
      />
      <p className="text-gray-300">{`${name} (${login})`}</p>
      <div className="flex items-center justify-between gap-8 my-4">
        <div className="repo-stat">
          <span className="repo-stat-number">{public_repos}</span> public repos
        </div>
        <div className="repo-stat">
          <span className="repo-stat-number">{public_gists}</span> public gists
        </div>
      </div>
      <footer className="text-gray-400 mt-4 text-sm ">
        Joined On : {moment(created_at).format("YYYY-MM-DD")}
      </footer>
    </div>
  );
};

export default UserCard;
