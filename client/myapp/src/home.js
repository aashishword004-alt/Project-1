import './home.css'

function home() {
    return (<>
        {/* ================= NAVBAR ================= */}
        <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
            <div className="container">
                {/* Logo */}
                <a className="navbar-brand linkedin-logo" href="#">
                    Linked<span>in</span>
                </a>
                {/* Search */}
                <form className="search-box d-none d-md-flex">
                    <i className="bi bi-search" />
                    <input type="text" placeholder="Search" />
                </form>
                {/* Navigation */}
                <div className="navbar-nav ms-auto nav-items">
                    <a href="#" className="nav-link active">
                        <i className="bi bi-house-door-fill" />
                        <span>Home</span>
                    </a>
                    <a href="#" className="nav-link">
                        <i className="bi bi-people-fill" />
                        <span>My Network</span>
                    </a>
                    <a href="#" className="nav-link">
                        <i className="bi bi-briefcase-fill" />
                        <span>Jobs</span>
                    </a>
                    <a href="#" className="nav-link">
                        <i className="bi bi-chat-dots-fill" />
                        <span>Messaging</span>
                    </a>
                    <a href="#" className="nav-link">
                        <i className="bi bi-bell-fill" />
                        <span>Notifications</span>
                    </a>
                    <a href="#" className="nav-link">
                        <i className="bi bi-person-circle" />
                        <span>Me</span>
                    </a>
                </div>
            </div>
        </nav>
        {/* ================= MAIN ================= */}
        <main className="container py-4">
            <div className="row g-4">
                {/* ================= LEFT SIDEBAR ================= */}
                <div className="col-lg-3">
                    <div className="card profile-card">
                        <div className="profile-cover" />
                        <div className="profile-content text-center">
                            <div className="profile-image">AP</div>
                            <h5 className="mt-3 mb-1">Ashish Parmar</h5>
                            <p className="text-muted small">Full Stack Developer</p>
                            <hr />
                            <div className="profile-stat">
                                <span>Connections</span>
                                <strong>150</strong>
                            </div>
                            <div className="profile-stat">
                                <span>Followers</span>
                                <strong>250</strong>
                            </div>
                        </div>
                    </div>
                    {/* Left Menu */}
                    <div className="card mt-3">
                        <div className="list-group list-group-flush">
                            <a href="#" className="list-group-item">
                                <i className="bi bi-bookmark-fill" />
                                Saved Items
                            </a>
                            <a href="#" className="list-group-item">
                                <i className="bi bi-people-fill" />
                                Groups
                            </a>
                            <a href="#" className="list-group-item">
                                <i className="bi bi-calendar-event" />
                                Events
                            </a>
                        </div>
                    </div>
                </div>
                {/* ================= MAIN FEED ================= */}
                <div className="col-lg-6">
                    {/* Create Post */}
                    <div className="card create-post">
                        <div className="d-flex align-items-center">
                            <div className="small-profile">AP</div>
                            <button className="post-input">Start a post</button>
                        </div>
                        <div className="post-options">
                            <button>
                                <i className="bi bi-image" />
                                Photo
                            </button>
                            <button>
                                <i className="bi bi-play-btn-fill" />
                                Video
                            </button>
                            <button>
                                <i className="bi bi-calendar-event" />
                                Event
                            </button>
                            <button>
                                <i className="bi bi-file-text" />
                                Article
                            </button>
                        </div>
                    </div>
                    {/* ================= POST 1 ================= */}
                    <div className="card post-card mt-3">
                        <div className="post-header">
                            <div className="small-profile">AP</div>
                            <div>
                                <h6 className="mb-0">Ashish Parmar</h6>
                                <small className="text-muted">Full Stack Developer</small>
                                <br />
                                <small className="text-muted">2h • 🌎</small>
                            </div>
                        </div>
                        <div className="post-content">
                            <p>
                                Learning React.js and Node.js to build modern full-stack
                                applications. 🚀
                            </p>
                            <p>Excited to build my own LinkedIn clone!</p>
                        </div>
                        <div className="post-stats">
                            <span>👍 125 Likes</span>
                            <span>20 Comments</span>
                        </div>
                        <div className="post-actions">
                            <button>
                                <i className="bi bi-hand-thumbs-up" />
                                Like
                            </button>
                            <button>
                                <i className="bi bi-chat" />
                                Comment
                            </button>
                            <button>
                                <i className="bi bi-arrow-repeat" />
                                Repost
                            </button>
                            <button>
                                <i className="bi bi-send" />
                                Send
                            </button>
                        </div>
                    </div>
                    {/* ================= POST 2 ================= */}
                    <div className="card post-card mt-3">
                        <div className="post-header">
                            <div className="small-profile second">JD</div>
                            <div>
                                <h6 className="mb-0">John Developer</h6>
                                <small className="text-muted">Software Engineer</small>
                                <br />
                                <small className="text-muted">5h • 🌎</small>
                            </div>
                        </div>
                        <div className="post-content">
                            <p>What technology are you currently learning?</p>
                            <p>React, Node.js, Python or something else? 💻</p>
                        </div>
                        <div className="post-stats">
                            <span>👍 89 Likes</span>
                            <span>14 Comments</span>
                        </div>
                        <div className="post-actions">
                            <button>
                                <i className="bi bi-hand-thumbs-up" />
                                Like
                            </button>
                            <button>
                                <i className="bi bi-chat" />
                                Comment
                            </button>
                            <button>
                                <i className="bi bi-arrow-repeat" />
                                Repost
                            </button>
                            <button>
                                <i className="bi bi-send" />
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                {/* ================= RIGHT SIDEBAR ================= */}
                <div className="col-lg-3">
                    {/* LinkedIn News */}
                    <div className="card news-card">
                        <div className="card-body">
                            <h5>
                                LinkedIn News
                                <i className="bi bi-info-circle" />
                            </h5>
                            <div className="news-item">
                                <strong>AI skills are in demand</strong>
                                <small>2h ago • 12,540 readers</small>
                            </div>
                            <div className="news-item">
                                <strong>Tech jobs continue to grow</strong>
                                <small>4h ago • 8,320 readers</small>
                            </div>
                            <div className="news-item">
                                <strong>Developers learn new skills</strong>
                                <small>6h ago • 5,210 readers</small>
                            </div>
                            <a href="#" className="show-more">
                                Show more
                            </a>
                        </div>
                    </div>
                    {/* People Suggestions */}
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="mb-3">People you may know</h5>
                            <div className="suggestion">
                                <div className="suggestion-image">RS</div>
                                <div>
                                    <strong>Rahul Shah</strong>
                                    <small>React Developer</small>
                                    <button>+ Connect</button>
                                </div>
                            </div>
                            <div className="suggestion">
                                <div className="suggestion-image second">PP</div>
                                <div>
                                    <strong>Priya Patel</strong>
                                    <small>UI/UX Designer</small>
                                    <button>+ Connect</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        {/* Bootstrap JS */}
    </>
    )
}

export default home;