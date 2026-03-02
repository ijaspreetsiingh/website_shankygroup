"use client";
const SearchArea = ({ isOpenSearch, setIsOpenSearch }: any) => {
	return (
		<>
			<div id="search-popup" className={`search-popup ${isOpenSearch ? "popup-visible" : ""}`}>
				<div className="popup-inner">
					<div className="close-search">
						<span className="icon-14" onClick={() => setIsOpenSearch(false)}></span>
					</div>
					<div className="container">
						<div className="search-box">
							<form onSubmit={(e) => e.preventDefault()}>
								<div className="form-group">
									<input
										type="search"
										name="search-field"
										value=""
										placeholder="Type your keyword"
										required
									/>
									<button type="submit">
										<i className="icon-22"></i>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchArea;
