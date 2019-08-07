import React, { Component } from "react";
import axios from "axios";
import { register } from "timeago.js";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";

register("it", require("timeago.js/lib/lang/it"));

export default class NotesList extends Component {

    state = {
        notes: []
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({
            notes: res.data
        });
    }

    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:4000/api/notes/' + noteId);
        this.getNotes();
    }
    
    controlDate = mydate => {
        const ahora = new Date();
        const inDb = new Date(mydate);
        if (inDb <=  ahora) {
          return "softgray";
        } else {
          return "red";
        }
    }
    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link to={"/edit/" + note._id} className="btn btn-secondary">
                                        <i className="material-icons">
                                            border_color</i>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="gray">
                                        {note.content}
                                    </p>
                                    <p>
                                        Author: <em>{note.author}</em>
                                    </p>
                                    <p className={this.controlDate(note.date)}>
                                        <TimeAgo datetime={note.date} locale="it" />
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
