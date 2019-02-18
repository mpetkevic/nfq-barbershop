export const getClients = () => {
  let clients = JSON.parse(localStorage.getItem('BarberShop-clients-mpetkevic'));
  if (clients === null) {
    localStorage.setItem('BarberShop-clients-mpetkevic', JSON.stringify([]))
  }
  return clients;
}

export const addClient = (client) => {
  let clients = JSON.parse(localStorage.getItem('BarberShop-clients-mpetkevic'));
  clients.push(client);
  localStorage.setItem('BarberShop-clients-mpetkevic', JSON.stringify(clients))
}

export const removeClient = (id) => {

  let clients = JSON.parse(localStorage.getItem('BarberShop-clients-mpetkevic'));
  const newClients = clients.filter(client => {
    return client.id !== id
  })
  localStorage.setItem('BarberShop-clients-mpetkevic', JSON.stringify(newClients))
  console.log(newClients)
}