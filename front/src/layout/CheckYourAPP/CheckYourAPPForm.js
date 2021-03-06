import React, { useRef, useState, useEffect } from "react";
import CheckYourAPP from "./CheckYourAPP.js";
import GenerateAnnonymousLink from "./GenerateAnnonymousLink.js";
import ErrorImage from "./ErrorImage.jpeg";

const CheckYourAPPForm = (props) => {
  const formRef = useRef();
  const [url, setUrl] = useState(null);
  const [habeasData, setHabeasData] = useState("");
  const [instruction, setInstruction] = useState("");
  const [openQs, setOpenQs] = useState([]);
  const [openQsAdd, setOpenQsAdd] = useState([]);
  const [selectQs, setSelectQs] = useState([]);
  const [radioQs, setRadioQs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const url = form.URL.value;
    setUrl(url);

    let test = {
      user: 1,
      title: title,
      description: description,
      url: url,
      habeas: habeasData,
      selectQs: selectQs,
      radioQs: radioQs,
      openQs: openQsAdd,
      instruction: instruction,
    };

    fetch("/newTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    });
  };

  const isLogin = () => {
    const login = props.user;
    if (login == null) return false;
    return true;
  };

  useEffect(() => {
    fetch("/getBaseTest")
      .then((response) => {
        return response.json();
      })
      .then((test) => {
        let t = test[0];
        setSelectQs(t.defaultSelectQs);
        setHabeasData(t.habeas);
        setRadioQs(t.defaultRadioQs);
      });
  }, []);

  const handleChange = (evt) => {
    const form = formRef.current;
    const newHab = form.habeasd.value;
    setHabeasData(newHab);
    const newInst = form.instruction.value;
    setInstruction(newInst);
  };

  const handleChange2 = (evt) => {
    let matches = evt.target.id.match(/\d+/g);
    let copy = [...openQs];
    copy[matches[0]].label = evt.target.value;
    setOpenQsAdd(copy);
  };

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const addOpenQuestion = (evt) => {
    setOpenQs([...openQs, { label: "" }]);
    setOpenQsAdd([...openQsAdd, { label: "" }]);
  };

  return (
    <div className="container">
      <h1>Create your own test </h1>
      {!isLogin() ? (
        <div>
          <img
            src={ErrorImage}
            alt="You need to be logged in to do create your own test"
            height="112"
            width="112"
          />
          <br />
          <div className="alert alert-danger" role="alert">
            You need to be login to do your own test
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="title">Title</label>
                  <textarea
                    class="form-control"
                    id="title"
                    rows="1"
                    placeholder="Type a title here"
                    onChange={handleChangeTitle}
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="title">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="1"
                    placeholder="Type a description for your webpage here"
                    onChange={handleChangeDescription}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Insert your application URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="URL"
                    aria-describedby="emailHelp"
                  />
                </div>
                <CheckYourAPP url={url}></CheckYourAPP>
                <div class="form-group">
                  <label for="texta1">Habeas Data</label>
                  <br></br>
                  <small>You can paste your own or edit our default</small>
                  <textarea
                    class="form-control"
                    id="habeasd"
                    rows="12"
                    value={habeasData}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {radioQs.map((q) => {
                  return (
                    <div className="form-group">
                      <label>{q.label}</label>
                      {q.answers ? (
                        q.answers.map((ans) => {
                          return (
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id={ans.answer}
                                name={ans.answer}
                                className="custom-control-input"
                              ></input>
                              <label
                                className="custom-control-label"
                                for={ans.answer}
                              >
                                {ans.answer}
                              </label>
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                })}
                {selectQs.map((q) => {
                  return (
                    <div className="form-group">
                      <label>{q.label}</label>
                      <select className="custom-select">
                        <option selected>{q.selected}</option>
                        {q.options ? (
                          q.options.map((o) => {
                            return <option value={o.option}>{o.option}</option>;
                          })
                        ) : (
                          <div></div>
                        )}
                      </select>
                    </div>
                  );
                })}
                <div class="form-group">
                  <label for="texta2">
                    Instruction for the user to carry out
                  </label>
                  <br></br>
                  <textarea
                    class="form-control"
                    id="instruction"
                    rows="2"
                    placeholder="What do you want the user to do in your webpage?"
                    onChange={handleChange}
                  ></textarea>
                </div>
                {openQs.map((q, i) => {
                  return (
                    <div class="form-group">
                      <label for={"openQ" + i}>
                        {"Type your open question " + (i + 1)}
                      </label>
                      <br></br>
                      <textarea
                        class="form-control"
                        id={"openQ" + i}
                        rows="1"
                        placeholder="Type your question here"
                        onChange={handleChange2}
                      ></textarea>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addOpenQuestion}
                >
                  Add open question
                </button>
                <br />
                <br />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <br />
            <GenerateAnnonymousLink></GenerateAnnonymousLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckYourAPPForm;
