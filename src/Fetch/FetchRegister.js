 
 
 
 
 
// const categories = [...new Set(game.map((item) => item.day))]

//     const handleClick = (id) => {
//         console.log(id)
//         setActiveState((state) => {
//             return {
//                 ...state,
//                 [id]: !state[id],
//             };
//         });
        
//     }

//     const filterItems = (category, index) => {
//         const newItems = game.filter((item) => item.day === category)
//         setMenuItems(newItems)

//         setActiveState((state) => {
//             return {
//                 ...state,
//                 [index]: !state[index],
//             };
//         });
//     }
 
 
 
 
//  <h6 className='draw'>Choose A Draw</h6>
//                         <section className='days pl-md-2'>
//                     {obj.map((day) => {
//                         const { id, date } = day;
//                         return (
//                             <section>
//                                <h6 onClick={() => handleClick(id)} key={id} className='d-flex justify-content-between sidebar_dates'>
//                                 {date}
//                                 {activeState[id] ?  <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} /> }
//                                </h6>
//                             </section>
//                         )
//                     })}
//                             <section>
//                                 {
//                                     categories.map((category, index) => {
//                                         return (
//                                             <section>
//                                                 <h6 type='button' className='filter-btn' onClick={() => filterItems(category, index)} key={index}>{category}</h6>
//                                                 { activeState[index] &&
//                                                     menuItems.map((day) => {
//                                                        return <p>{day.name}</p>
//                                                     })
//                                             }
//                                         </section>
//                                     )
//                                     })
//                                 }
                        
//                                 </section>
                            
//                </section>