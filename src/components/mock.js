import GroupsData from './groups.json';
export default function Server() {
    return (
        new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              result: 1,
              data: GroupsData,
            }),
          1000
        )
      })
    )
}