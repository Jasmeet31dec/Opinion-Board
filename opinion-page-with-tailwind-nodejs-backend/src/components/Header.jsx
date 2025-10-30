export function Header({ loggedIn }) {
  function handleLogOut() {
    loggedIn(false);
  }
  return (
    <header class="text-center bg-[#2e2923] text-[#d2cdc6] p-12 relative">
      <div id="main-header" class="text-center bg-[#2e2923] text-[#d2cdc6] p-12 relative">
        <h1 class="text-5xl font-sans text-[#fd9217] mb-4">OpinionBoard</h1>
        <p class="max-w-[25rem] mx-auto">
          Strong opinions, judged by anonymous internet users. What could possibly
          go wrong?
        </p>
        <button class="logout-button 
                       bg-transparent border border-[#f9f7f3] text-[#f9f7f3] 
                       py-2 px-4 rounded-[20px] cursor-pointer 
                       font-semibold text-[0.9rem] transition-all duration-200 
                       absolute right-8 top-1/2 -translate-y-1/2 
                       hover:bg-[#f9f7f3] hover:text-[#2e2923]" onClick={handleLogOut}>Log out</button>
      </div>
    </header>


  );
}
