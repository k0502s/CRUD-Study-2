import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import { withRouter } from 'react-router-dom';


const AddTutorial = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
    props.history.push('/tutorials')
  };
  
  const newTutorial2 = () => {
    props.history.push('/tutorials')
    
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>회원 추가 완료.</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            확인
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            추가
          </button>
          <button className="m-3 btn btn-sm btn-danger" onClick={newTutorial2}>
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default withRouter(AddTutorial)
