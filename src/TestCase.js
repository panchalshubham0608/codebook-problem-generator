// imports
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// component for the test case
export default function TestCase(props) {
    const {index, testCase, updateTestCase, deleteTestCase} = props;
    return (
        <div className='border rounded mb-3 p-3'>
            <div className='d-flex justify-content-between'>
                <div>
                    <div className='d-flex align-items-center'>
                        <p className='m-0'>Test Case {index + 1}</p>
                        <button className='btn' onClick={() => deleteTestCase(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                    <div>
                        <input type="checkbox" className="form-check-input" id={`${index}_locked`} checked={testCase.locked} 
                            onChange={event => updateTestCase(index, {
                                ...testCase,
                                locked: event.target.checked,
                            })}/>
                        <label htmlFor={`${index}_locked`} className="form-check-label" style={{marginLeft: "5px"}}>Locked</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor={`${index}_timeout`} className="form-label mr-1">Timeout</label>
                        <input type="number" className="form-control col mr-1" id={`${index}_timeout`} placeholder="Timeout" value={testCase.timeout}
                            onChange={event => updateTestCase(index, {
                                ...testCase,
                                timeout: event.target.value,
                            })
                        } />
                    </div>
                    <div className='col'>
                        <label htmlFor={`${index}_score`} className="form-label mr-1">Score</label>
                        <input type="number" className="form-control col mr-1" id={`${index}_score`} placeholder="Score" value={testCase.score}
                            onChange={event => updateTestCase(index, {
                                ...testCase,
                                score: event.target.value,
                            })
                        } />
                    </div>
                </div>
            </div>
            <hr/>
            <div className='row'>
                <div className="mb-3 col">
                    <label htmlFor={`${index}_input`} className="form-label">Input</label>
                    <textarea className="form-control" id={`${index}_input`} rows="3" style={{resize: 'none'}}
                        onChange={event => updateTestCase(index, {
                            ...testCase,
                            input: event.target.value,
                        })
                    } value={testCase.input}></textarea>
                </div>
                <div className="mb-3 col">
                    <label htmlFor={`${index}_output`} className="form-label">Output</label>
                    <textarea className="form-control" id={`${index}_output`} rows="3" style={{resize: 'none'}}
                        onChange={event => updateTestCase(index, {
                            ...testCase,
                            output: event.target.value,
                        })                    
                    } value={testCase.output}></textarea>
                </div>
            </div>
        </div>
    )
};