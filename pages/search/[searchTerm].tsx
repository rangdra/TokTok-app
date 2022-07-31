import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';
import { GoVerified } from 'react-icons/go';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';

import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers } = useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>{searchTerm} - TokTok App</title>
      </Head>

      <div className="w-full">
        <div className="">
          <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
              onClick={() => setIsAccounts(true)}
            >
              Accounts
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
              onClick={() => setIsAccounts(false)}
            >
              Videos
            </p>
          </div>
        </div>

        {isAccounts ? (
          <div className="md:mt-16">
            {searchedAccounts.length ? (
              searchedAccounts.map((user: IUser, idx: number) => (
                <Link href={`/profile/${user._id}`} key={idx}>
                  <div className="flex gap-3 p-2 font-semibold border-b-2 border-gray-200 rounded cursor-pointer">
                    <div>
                      <Image
                        src={user.image}
                        width={50}
                        height={50}
                        className="rounded-full"
                        alt="user profile"
                      />
                    </div>

                    <div className="hidden xl:block">
                      <p className="flex items-center gap-1 font-bold lowercase text-md text-primary">
                        {user.username.replaceAll(' ', '')}{' '}
                        <GoVerified className="text-blue-400" />
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {user.username}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <NoResults text={`No users results for ${searchTerm}`} />
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start">
            {videos.length ? (
              videos.map((video: Video, idx) => (
                <VideoCard post={video} key={idx} />
              ))
            ) : (
              <>
                <NoResults text={`No video results for ${searchTerm}`} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};
