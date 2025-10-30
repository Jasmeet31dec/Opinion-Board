import { createContext, useEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import Notification from '../components/Notification';

export const OpinionsContext = createContext({
  opinions: null,
  sortedOpinions: null,
  mostVoted: () => { },
  latestOpinions: () => {},
  addOpinion: (opinion) => { },
  upvoteOpinion: (id) => { },
  downvoteOpinion: (id) => { },
});

export function OpinionsContextProvider({ children }) {
  const { showNotification } = useNotification();
  const [opinions, setOpinions] = useState();
  const [sortedOpinions, setSortedOpinions] = useState(null);

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch('http://localhost:8080/opinion');
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, [opinions]);

  async function mostVoted() {
    const response = await fetch('http://localhost:8080/opinion/mostVoted');
    if (!response.ok) {
      showNotification(
        "Error occurred!",
        "something went wrong."
      );
      return;
    }

    const savedOpinion = await response.json();
    setSortedOpinions(savedOpinion);
  }

  async function latestOpinions() {
    const response = await fetch('http://localhost:8080/opinion/latest');
    if (!response.ok) {
      showNotification(
        "Error occurred!",
        "something went wrong."
      );
      return;
    }

    const savedOpinion = await response.json();
    setSortedOpinions(savedOpinion);
  }

  async function addOpinion(enteredOpinionData) {
    const response = await fetch('http://localhost:8080/opinion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
    setSortedOpinions(null);
  }

  async function upvoteOpinion(id, userId) {
    console.log("store :", userId);
    const response = await fetch(`http://localhost:8080/opinion/${id}/upvotes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId
      })
    });

    if (!response.ok) {
      if (response.status === 400) {
        /*alert("Already upvoted");*/
        showNotification(
          "Already Upvoted!",
          "You've already cast your vote on this opinion."
        );
      } else {
        showNotification(
          "Upvoted Successfully",
          "you have switched from downvote to upvote."
        );
      }
      return;
    }

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id, userId) {
    const response = await fetch(`http://localhost:8080/opinion/${id}/downvotes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId
      })
    });

    if (!response.ok) {
      if (response.status === 400) {
        /*alert("Already downvoted");*/
        showNotification(
          "Already Downvoted!",
          "You've already cast your vote on this opinion."
        );
      } else {
        showNotification(
          "Downvoted Successfully",
          "you have switched from upvote to downvote."
        );
      }
      return;
    }
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    sortedOpinions: sortedOpinions,
    latestOpinions,
    mostVoted,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
