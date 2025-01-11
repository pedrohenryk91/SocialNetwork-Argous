
export async function calcDistance(pos1: GeolocationCoordinates, pos2: GeolocationCoordinates) {
    const distanceSquared = (pos1.longitude + pos2.longitude)**2 - (pos1.latitude + pos2.latitude)**2
    const distance = Math.sqrt(distanceSquared)
    return distance
}
