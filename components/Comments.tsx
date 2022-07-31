import { Dispatch, FormEvent, SetStateAction } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NoResults from './NoResults';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import { GoVerified } from 'react-icons/go';

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent) => void;
  isPostingComment: boolean;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}

const Comments = ({
  comment,
  comments,
  setComment,
  addComment,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="items-center p-2" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3 cursor-pointer">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
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
                      <div>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 px-2 pb-6 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment"
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-gray-400 text-md" onClick={addComment}>
              {isPostingComment ? 'Comenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
