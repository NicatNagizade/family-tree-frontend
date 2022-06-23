import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TreeItem from '@mui/lab/TreeItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddModal from './addModal';
import DeleteModal from './deleteModal';

export default function Home() {
  const [modalType, setModalType] = useState(null)
  const [member, setMember] = useState({})
  const [data, setData] = useState([])
  const url = process.env.REACT_APP_API_URL + '/member'

  const syncMembers = () => {
    axios.get(url)
      .then(res => {
        setData(res.data)
      })
  }

  useEffect(() => {
    syncMembers()
  }, [])

  const handleOpenModal = (e, type = 'add') => {
    e.stopPropagation()
    setModalType(type)
  }
  const handleAddModal = (e, id) => {
    handleOpenModal(e, 'add')
    axios.get(url + '/' + id)
      .then(res => {
        setMember({ parent: res.data })
      })
  }
  const handleEditModal = (e, id) => {
    handleOpenModal(e, 'add')
    axios.get(url + '/' + id)
      .then(res => {
        setMember(res.data)
      })
  }
  const handleDeleteModal = (e, id) => {
    handleOpenModal(e, 'delete')
    axios.get(url + '/' + id)
      .then(res => {
        setMember(res.data)
      })
  }
  const handleCloseModal = () => {
    setModalType(null)
    setMember({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (member.id > 0) {
      await axios.put(url + '/' + member.id, member)
        .then(res => {

        })
    } else {
      await axios.post(url, member)
        .then(res => {

        })
    }
    setModalType(null)
    syncMembers()
  }
  const handleDelete = async (e) => {
    e.stopPropagation()
    await axios.delete(url + '/' + member.id)
      .then(res => {

      })
    setModalType(null)
    syncMembers()
  }

  const MemberView = ({ members }) => {
    return members.map(m => {
      return (
        <TreeItem key={m.id} nodeId={m.id.toString()} label={
          <div style={{ display: 'flex', justifyContent: "space-between", width: "95%" }}>
            <div>{m.fullname}</div>
            <div>
              <AddBoxIcon color="action" onClick={(e) => handleAddModal(e, m.id)} />
              <EditIcon color="primary" onClick={(e) => handleEditModal(e, m.id)} />
              <DeleteIcon color="warning" onClick={(e) => handleDeleteModal(e, m.id)} />
            </div>
          </div>
        }>
          {
            m.children && Array.isArray(m.children) && m.children.length > 0 && <MemberView members={m.children} />
          }
        </TreeItem>
      )
    })
  }
  return (
    <div className="App">
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          height: 216, flexGrow: 1, maxWidth: 600,
          overflowY: 'auto', overflowX: 'hidden',
          margin: '50px auto'
        }}
      >
        <TreeItem nodeId="0" label={
          <div style={{ display: 'flex', justifyContent: "space-between", width: "95%" }}>
            <div>Families</div>
            <div>
              <AddBoxIcon color="action" onClick={handleOpenModal} />
            </div>
          </div>
        }>
          <MemberView members={data} />
        </TreeItem>
      </TreeView>
      <AddModal open={modalType === 'add'} handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit} member={member} setMember={setMember} />
      <DeleteModal open={modalType === 'delete'} handleCloseModal={handleCloseModal}
        handleDelete={handleDelete} member={member} />
    </div>
  );
}
