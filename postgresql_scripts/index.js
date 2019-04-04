const sql = {}

sql.query = {
	// Counting & Average
	
	// Information
	page_lims: 'SELECT * FROM Availabilities ORDER BY start_ts ASC LIMIT 10 OFFSET $1',
	ctx_posts: 'SELECT COUNT(*) FROM Availabilities',

	// Caretakers
	my_avail: 'SELECT * FROM Availabilities WHERE ctname=$1 ORDER BY start_ts ASC',
	single_avail_bids: 'SELECT * FROM Bids WHERE availabilityId=$1 and id not in (SELECT id from AcceptedBids)',
	
	// Insertion
	add_user: 'INSERT INTO Users (username, password, email, phone_number) VALUES ($1,$2,$3,$4)',
	add_owner: 'INSERT INTO Owners (username) VALUES ($1)',
	add_caretaker: 'INSERT INTO Caretakers (username) VALUES ($1)',
	add_availability: 'INSERT INTO Availabilities (id, ctname, start_ts, end_ts) VALUES ((SELECT (COALESCE(MAX(id), 0)) from Availabilities)+1,$1,$2,$3)',
	add_bid: 'INSERT INTO Bids (id, availabilityid, oname,ostart_ts, oend_ts, bidded_price_per_hour) VALUES ((SELECT (COALESCE(MAX(id), 0)) from Bids)+1, $1,$2,$3,$4,$5)',
	accept_bid: 'INSERT INTO AcceptedBids (id) VALUES ($1)',

	// Login
	userpass: 'SELECT * FROM Users WHERE username=$1',
	ownerpass: 'SELECT * FROM Owners WHERE username=$1',
	caretakerpass: 'SELECT * FROM Caretakers WHERE username=$1',
	
	// Update
	
	// Search
}

module.exports = sql