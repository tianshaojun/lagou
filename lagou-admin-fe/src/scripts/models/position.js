// type: get post put(patch) delete options 
const list = ({
  pageNo,
  pageSize,
  keywords
}) => {
  return $.ajax({
    url: '/api/position/list',
    data: {
      pageNo,
      pageSize,
      keywords
    },
    success: (result) => {
      return result
    }
  })
}

const listall = ({keywords}) => {
  return $.ajax({
    url: '/api/position/listall',
    data: {
      keywords
    },
    success: (result) => {
      return result
    }
  })
}

const listone = (id) => {
  return $.ajax({
    url: '/api/position/listone',
    type: 'POST',
    data: {
      id
    },
    success: (result) => {
      return result
    }
  })
}

const save = (data) => {
  // return $.ajax({
  //   url: '/api/position/save',
  //   type: 'POST',
  //   data,
  //   success: (result) => {
  //     return result
  //   }
  // })
  return new Promise((resolve, reject) => {
    var options = {
      "success": (result) => {
        resolve(result)
      },
      "resetForm": true,
      "dataType": "json"
    };
    $("#possave").ajaxSubmit(options)
  })
}

const update = (data) => {
  // return $.ajax({
  //   url: '/api/position/update',
  //   type: 'POST',
  //   data,
  //   success: (result) => {
  //     return result
  //   }
  // })

  return new Promise((resolve, reject) => {
    var options = {
      "success": (result) => {
        resolve(result)
      },
      "resetForm": true,
      "dataType": "json"
    };
    $("#posupdate").ajaxSubmit(options)
  })
}

const remove = (id) => {
  return $.ajax({
    url: '/api/position/remove',
    type: 'delete',
    data: {
      id
    },
    success: (result) => {
      return result
    }
  })
}

module.exports = {
  list,
  listall,
  listone,
  save,
  remove,
  update
}