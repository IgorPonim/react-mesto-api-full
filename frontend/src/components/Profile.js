const Profile = ({ name, about, avatar, onEditProfile, onAddClick, onAvatarEditClick }) => {
  return (
    <section className='profile'>
      <img src={avatar} alt={name} className='profile__avatars' /><button onClick={onAvatarEditClick} className='profile__avatars-edit'></button>
      <div className='profile__infos'>
        <h1 className='profile__name'>{name}</h1>
        <button type='button' className='profile__edit' onClick={onEditProfile}></button>
        <p className='profile__status'>{about}</p>
      </div>
      <button type='button' onClick={onAddClick} className='profile__add'></button>
    </section>

  )
}




export default Profile;