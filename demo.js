class FbLike extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let photo;
    if(this.props.img){
      photo = <img className="detailimg" src={this.props.img}/>
    }
    return (
      <div className="timelineUnitContainer">
         <div className="head">
           <div className="name">
              <img src={this.props.avatar || "https://goo.gl/5vomGt" } className="icon" />
              <div className="title">{this.props.title}</div>
              <div className="time">{this.props.time}</div>
           </div>
         </div>
         <div className="detail">{this.props.info}</div>
         {photo}
         <div className="likebar">
         <span>讚</span>
         <span>留言</span>
         <span>分享</span>
        </div>
      </div>
    );
  }
}

class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPageUrl = this.previousPageUrl.bind(this);
    this.request = this.request.bind(this);
    this.state = {
      list: [],
      nextPageUrl: '',
      previousPageUrl: '',
    };
  }

  getData() {
    FB.api("491371211017171/feed",
    { limit: 15 },
    function(res) {
      console.log(res);
      this.setState({
        list: res.data,
        nextPageUrl: res.paging.next,
        previousPageUrl: res.paging.previous,
      });
    }.bind(this));
  }

  nextPage() {
    this.request(this.state.nextPageUrl);
  }

  previousPageUrl() {
    this.request(this.state.previousPageUrl);
  }

  request(url){
    axios.get(url)
    .then(function (res) {
      res = res.data;
      console.log(res);
      this.setState({
        list: res.data,
        nextPageUrl: res.paging.next,
        previousPageUrl: res.paging.previous,
      });
    }.bind(this));
  }

  render(){
    let postList = this.state.list.map((post,i) => {
      if(post.message){
        return(
          <FbLike key={i} title={"創科資訊"} time={post.created_time.split('T')[0]} info={post.message} />
        );
      }
    });
    return (
      <div>
        <input type="button" onClick={ this.getData } value={"Get Data"} />
        <input type="button" onClick={ this.previousPageUrl } value={"上一頁"} />
        <input type="button" onClick={ this.nextPage } value={"下一頁"} />
        {postList}
      </div>
    );
  }
}

React.render(<TimeLine />, document.getElementById('timeline'));
