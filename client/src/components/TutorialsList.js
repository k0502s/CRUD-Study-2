import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { withRouter } from 'react-router-dom';

const TutorialsList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");


  ////페이지 번호/////


  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];



  //현재 상태의 검색창에 입력한 title 값, page, pagesize을 params 객체에 담아준다.
  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};
   
    if (searchTitle) {
      params.title = searchTitle; 
    }

    if (page) {
      params.page = page - 1;
    }

    if (pageSize) {
      params.size = pageSize;
    }
    
    return params;
    
  };
  

  //현재 상태 값을 담은 params 객체 데이터를 서버로 보내주어 처리한 데이터를 다시 받아옴
  //받아온 데이터를 현재 상태  state의 리스트 값, 페이지의 conut 값으로 업데이트 해줌
  const retrieveTutorials = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    
    TutorialDataService.getAll(params)
      .then((response) => {
       const { tutorials, totalPages } = response.data;
       

        setTutorials(tutorials);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      
  };
  
  //retrieveTutorials 변수 선언 아래에 와야함
  useEffect(retrieveTutorials, [page, pageSize]);

//이벤트 발생하면 받아온 값을 통해 state의 page 값 업데이트
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //이벤트 발생하여 받아온 값을 보여주는 state의 페이지 갯수를 정해주는 pagesize 값을 업데이트 해주고
  //동시에 페이지 번호를 위한 state의 page 값 초기화 시켜줌.
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };






  
/////리스트 목록//////

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const refreshList2 = () => {
    retrieveTutorials();
    setCurrentTutorial();
    setCurrentIndex();
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    if(currentTutorial){
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
          refreshList2();
      })
      .catch(e => {
        console.log(e);
      });
  }
  else{
    refreshList();
  }
};

  const create = () => {
  props.history.push("/add")
  };

  



  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveTutorials}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>

       

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                <h4>{tutorial.title}</h4>
                <h8>{tutorial.description}</h8>
              </li>
            ))}
        </ul>
        <button
          className="btn btn-success"
          onClick={create}
        >
          회원 추가
        </button>
        <button className="m-3 btn btn-sm btn-danger" onClick={deleteTutorial}>
            회원 탈퇴
          </button>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          모두 삭제
        </button>
      </div>
      
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
      <div className="mt-3" >
          <h8 style={{marginLeft:250}}>Items per Page: </h8>
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            color="primary"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
    </div>
  );
};

export default withRouter(TutorialsList)
