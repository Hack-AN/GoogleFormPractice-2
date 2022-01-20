import {v4 as uuidv4} from 'uuid'
import axios from "axios"
import React, {useState} from "react"

export default function Input() {

    const [title, setTitle] = useState("")
    const [questions, setQuestions] = useState([])



    const createQuestion = () => {
        const cp = [...questions]
        cp.push({
            uuid : uuidv4(),
            title: "default title",
            questionType: "checkbox",
            description: "",
            selectOptions: [
                {
                    uuid: uuidv4(),
                    title: "default",
                    description: "default desc"
                }
            ]
        })
        setQuestions(cp);
    }

    const submit = async () => {
        const formId = uuidv4()
        axios.post("https://final.nodejs-tutorial-domain.net/route", {formId: formId, title:title, data: questions}).then( res => {
            console.log(res.data);
          });
    }

    const updateTitle = (text, uuid) => {
        const foundIndex = questions.findIndex(question => question.uuid === uuid)
        if(foundIndex === -1)
            return false
        
        const cp = [...questions]
        cp[foundIndex].title = text
        setQuestions(cp)
    }

    const updateDesc = (text, uuid) => {
        const foundIndex = questions.findIndex(question => question.uuid === uuid)
        if(foundIndex === -1)
            return false
        
        const cp = [...questions]
        cp[foundIndex].description = text
        setQuestions(cp) 
    }

    const deleteQuestion = (uuid) => {
        const foundIndex = questions.findIndex(question => question.uuid === uuid)
        if(foundIndex === -1)
            return false
        const cp = [...questions]
        cp.splice(foundIndex, 1)
        setQuestions(cp)
    }

    const updateOptionBar = (text, uuid) => {
        const foundIndex = questions.findIndex(question => question.uuid === uuid)
        if(foundIndex === -1)
            return false
        const cp = [...questions]
        cp[foundIndex].questionType = text
        setQuestions(cp)
    }

    const createOption = (uuid) => {       
        const foundIndex = questions.findIndex(question => question.uuid === uuid)
        if(foundIndex === -1)
            return false
        const cp = [...questions]
        cp[foundIndex].selectOptions.push({
            uuid: uuidv4(),
            title: "default",
            description: "default desc"
        })
        setQuestions(cp)

    }

    const updateOptionTitle = (text, q_uuid, o_uuid) => {
        const foundQIndex = questions.findIndex(question => question.uuid === q_uuid)
        if(foundQIndex === -1)
            return false
        const options = questions[foundQIndex].selectOptions
        const foundOIndex = options.findIndex(option => option.uuid === o_uuid)
        if(foundOIndex === -1)
            return false

        const cp = [...questions]
        cp[foundQIndex].selectOptions[foundOIndex].title = text
        setQuestions(cp)
    }

    const updateOptionDesc = (text, q_uuid, o_uuid) => {
        const foundQIndex = questions.findIndex(question => question.uuid === q_uuid)
        if(foundQIndex === -1)
            return false
        const options = questions[foundQIndex]
        const foundOIndex = options.selectOptions.findIndex(option => option.uuid === o_uuid)
        if(foundOIndex === -1)
            return false

        const cp = [...questions]
        cp[foundQIndex].selectOptions[foundOIndex].description = text
        setQuestions(cp)
    }

    const deleteOption = (q_uuid, o_uuid) => {
        const foundQIndex = questions.findIndex(question => question.uuid === q_uuid)
        if(foundQIndex === -1)
            return false
        const options = questions[foundQIndex]
        const foundOIndex = options.selectOptions.findIndex(option => option.uuid === o_uuid)
        if(foundOIndex === -1)
            return false

        const cp = [...questions]
        const selected = cp[foundQIndex].selectOptions
        selected.splice(foundOIndex, 1)
        setQuestions(cp)
    }

    return (
        <div>
            create form
            <br></br>
            <textarea id ="title" placeholder="input title..." value={title} onChange={e => setTitle(e.target.value)}></textarea>
            <br></br>
            <br></br>
            {questions.map((question, index) => {
                return <Question 
                key = {index}
                question = {question}
                updateTitle = {updateTitle} 
                updateDesc = {updateDesc} 
                deleteQuestion = {deleteQuestion}
                updateOptionBar = {updateOptionBar}
                createOption = {createOption}
                updateOptionTitle = {updateOptionTitle}
                updateOptionDesc = {updateOptionDesc}
                deleteOption = {deleteOption}
                />
                
            })}

            <button onClick={e => createQuestion()}>add</button>
            <button onClick={e => submit()}>submit</button>
        </div>
    )
}

const Question = ({question, updateTitle, updateDesc, deleteQuestion, updateOptionBar, createOption, updateOptionTitle, updateOptionDesc, deleteOption,}) => {
    return <div>
            <br/>
            <input onChange={e => updateTitle(e.target.value, question.uuid)} placeholder="input title..." value={question.title}></input>
            <br/>
            <input onChange={e => updateDesc(e.target.value, question.uuid)} placeholder="input desc..." value={question.description}></input>
            <select onChange={e => updateOptionBar(e.target.value, question.uuid)} value={question.questionType}>
                <option value="checkbox">checkbox</option>
                <option value="radio">radio</option>
                <option value="text">text</option>
                <option value="long text">long text</option>
            </select>
            <button onClick={e => deleteQuestion(question.uuid)}>delete question</button>
            <br></br>
            here, if the question itself if....
            <br></br>
            {
                ((question.questionType === "checkbox") || (question.questionType === "radio")) &&
                <div style={{paddingLeft:40,}}> 
                {
                    question.selectOptions.map((option, index) => {
                        return <div key = {index}>
                        <input onChange={e => updateOptionTitle(e.target.value, question.uuid, option.uuid)} placeholder="input title..." value={option.title}></input>
                        {option.uuid}
                        <br/>
                        <input onChange={e => updateOptionDesc(e.target.value, question.uuid, option.uuid)} placeholder="input desc..." value={option.description}></input>
                        <button onClick={() => deleteOption(question.uuid, option.uuid)}>delete option</button>
                        </div>
                        
                })}
                <button onClick={e => createOption(question.uuid)}>add</button>
                </div>
       
            }
            


    
        </div>
    
}