import { useContext, useActionState, useOptimistic } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { UserContext } from '../store/userContext';

export function Opinion({ opinion: { _id, title, opinion, name, votes ,category}}) {
  const { upvoteOpinion, downvoteOpinion } = useContext(OpinionsContext);
  const { userId } = useContext(UserContext);

  const [optimisticVotes, setVotesOptimistically ] = useOptimistic(votes, (prevVotes, mode) => mode === 'up' ? prevVotes+1 : prevVotes-1);

  async function upVoteAction() {
    setVotesOptimistically('up');
    await upvoteOpinion(_id,userId);
  }

  async function downVoteAction() {
    setVotesOptimistically('down');
    await downvoteOpinion(_id,userId);
  }

  const [upVoteFormState, upVoteFormAction, upVotePending] = useActionState(upVoteAction);
  const [downVoteFormState, downVoteFormAction, downVotePending] = useActionState(downVoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {name}</p>
      </header>
      <p>{opinion}</p>
      
      <div className="opinion-footer">
        <form className="votes">
        <button formAction={upVoteFormAction} disabled={upVotePending || downVotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button formAction={downVoteFormAction} disabled={ upVotePending || downVotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button> 
      </form>
        <span className="opinion-category-pill">{category}</span>
      </div>
      
    </article>
  );
}
