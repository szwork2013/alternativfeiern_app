import request from 'superagent';

/*
 * actions types
 */

export const REQUEST_PAGES = 'REQUEST_PAGES';
export const RECEIVE_PAGES = 'RECEIVE_PAGES';


/*
 * action creators
 */

function requestPages() {
  return {
    type : REQUEST_PAGES
  }
}

function receivePages(pages) {
  //console.log(pages);
  return {
    type  : RECEIVE_PAGES,
    pages : pages,
  }
}

export function fetchPages() {
  return dispatch => {
    dispatch(requestPages());
    return request.get('/api/pages')
                  .end((err, res) => {
                    if(err) {
                      console.error(err);
                    } else if (res) {
                      dispatch(receivePages(res.body));
                    }
            });
  }
}
