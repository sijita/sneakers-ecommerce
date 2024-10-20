import useEditUserInfo from "@/hooks/profile/useEditUserInfo";
import MyModal from "../ui/MyModal";
import useLocations from "@/hooks/useLocations";

export default function DomicileModal({
  title,
  saveBtnText,
  selectPlaceholder,
  loadingPlaceholder,
  addressPlaceholder,
  detailsPlaceholder,
}) {
  const { departments, isLoading } = useLocations();
  const {
    handleUserInfo,
    handleSubmit,
    userInfo,
    domicileModal,
    handleEditDomicile,
  } = useEditUserInfo();
  return (
    <MyModal
      title={title}
      isOpen={domicileModal}
      closeModal={() => handleEditDomicile()}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <select
          name="department"
          value={userInfo.department}
          onChange={handleUserInfo}
          className={`select w-full border border-neutral text-secondary text-base ${
            userInfo.department && "text-secondary"
          }`}
        >
          <option className="text-secondary text-base" value="">
            {selectPlaceholder}
          </option>
          {!isLoading ? (
            departments.map((department) => (
              <option
                className="text-base-200 text-base"
                key={department.id}
                value={department.nombre}
              >
                {department.nombre}
              </option>
            ))
          ) : (
            <option className="text-secondary text-base">{loadingPlaceholder}...</option>
          )}
        </select>
        <select
          name="cityId"
          value={userInfo.cityId}
          onChange={handleUserInfo}
          className={`select w-full border border-neutral text-base text-secondary ${
            userInfo.cityId && "text-secondary"
          }`}
        >
          <option className="text-secondary text-base" value="">
            {selectPlaceholder}
          </option>
          {userInfo.department &&
            departments
              ?.find((department) => department.nombre === userInfo.department)
              .ciudad.map((ciudad) => (
                <option
                  className="text-base-200 text-base"
                  key={ciudad.id}
                  value={ciudad.id}
                >
                  {ciudad.nombre}
                </option>
              ))}
        </select>
        <input
          className="input border border-neutral"
          type="text"
          name="address"
          placeholder={addressPlaceholder}
          value={userInfo.address}
          onChange={handleUserInfo}
        />
        <input
          className="input border border-neutral"
          type="text"
          name="details"
          placeholder={detailsPlaceholder}
          value={userInfo.details}
          onChange={handleUserInfo}
        />
        <button className="btn btn-outline border-neutral">{saveBtnText}</button>
      </form>
    </MyModal>
  );
}
