import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';
import { GoVerified } from 'react-icons/go';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userLikedVideos, userVideos } = data;

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userVideos, userLikedVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 mb-4 bg-white md:gap-10">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={12}
            height={12}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="flex items-center justify-center gap-1 font-bold tracking-wider lowercase md:text-2xl text-md text-primary">
            {user.username.replaceAll(' ', '')}{' '}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="text-xs text-gray-400 capitalize md:text-xl">
            {user.username}
          </p>
        </div>
      </div>

      <div className="">
        <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};

export default Profile;
