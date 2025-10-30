import { NotificationProvider } from "../store/notification-context";
import { UserProvider } from "../store/userContext";

function RootElement() {
  return (
    <NotificationProvider>
      <UserProvider></UserProvider>
    </NotificationProvider>
  );
}

export default RootElement;

/* 
{loggedIn ?

          <>
            <Header loggedIn={setLoggedIn}/>
            <main class="max-w-[50rem] my-12 mx-auto p-8 border-l border-r border-[#35331] bg-white shadow-lg text-gray-800">
              <OpinionsContextProvider>
                <NewOpinion />
                <Filtering />
                <Opinions />
              </OpinionsContextProvider>
            </main>
          </>
          : <Options loggedIn={setLoggedIn} />}
*/
